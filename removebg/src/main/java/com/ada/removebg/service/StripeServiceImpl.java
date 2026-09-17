package com.ada.removebg.service;

import com.ada.removebg.Entity.OrderEntity;
import com.ada.removebg.dto.UserDTO;
import com.ada.removebg.repository.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${stripe.success.url}")
    private String successUrl;

    @Value("${stripe.cancel.url}")
    private String cancelUrl;

    private final OrderRepository orderRepository;
    private final UserService userService;

    @Override
    public Session createCheckoutSession(Double amount, String currency, String plan, String clerkId)
            throws StripeException {

        Stripe.apiKey = stripeSecretKey;

        // Stripe expects EUR amounts in cents rather than decimal euros.
        long amountInCents = Math.round(amount * 100);

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .setClientReferenceId(clerkId)
                .putMetadata("clerkId", clerkId)
                .putMetadata("plan", plan)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(currency.toLowerCase())
                                                .setUnitAmount(amountInCents)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(plan + " Credits")
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                )
                .build();

        return Session.create(params);
    }

    @Override
    public Map<String, Object> verifyPayment(String sessionId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> result = new HashMap<>();

        // The frontend calls this after checkout; confirm payment with Stripe before adding credits.
        Session session = Session.retrieve(sessionId);

        if (!"paid".equalsIgnoreCase(session.getPaymentStatus())) {
            result.put("success", false);
            result.put("message", "Payment not completed");
            return result;
        }

        OrderEntity existingOrder = orderRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + sessionId));

        // Reject repeat verification of an order already marked paid; this is not a concurrency lock.
        if (Boolean.TRUE.equals(existingOrder.getPayment())) {
            result.put("success", false);
            result.put("message", "Payment already verified");
            return result;
        }

        // Credit the account and quantity recorded on the order, not values supplied by the browser.
        UserDTO userDTO = userService.getUserByClerkId(existingOrder.getClerkId());
        userDTO.setCredits(userDTO.getCredits() + existingOrder.getCredits());
        userService.saveUser(userDTO);

        existingOrder.setPayment(true);
        existingOrder.setPaymentIntentId(session.getPaymentIntent());
        orderRepository.save(existingOrder);

        result.put("success", true);
        result.put("message", "Credits added");
        return result;
    }
}