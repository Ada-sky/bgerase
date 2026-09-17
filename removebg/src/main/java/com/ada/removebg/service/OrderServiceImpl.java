package com.ada.removebg.service;

import com.ada.removebg.Entity.OrderEntity;
import com.ada.removebg.repository.OrderRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final StripeService stripeService;
    private final OrderRepository orderRepository;

    private static final Map<String, PlanDetails> PLAN_DETAILS = Map.of(
            "Basic", new PlanDetails("Basic", 10, 9.9),
            "Premium", new PlanDetails("Premium", 25, 19.9),
            "Ultimate", new PlanDetails("Ultimate", 50, 39.9)
    );

    private record PlanDetails(String name, int credits, double amount) {}

    @Override
    public Session createOrder(String planId, String clerkId) throws StripeException {

        // Resolve price and credit quantity server-side; the client supplies only a plan ID.
        PlanDetails details = PLAN_DETAILS.get(planId);
        if (details == null) {
            throw new IllegalArgumentException("Invalid planId");
        }

        Session session = stripeService.createCheckoutSession(
                details.amount(),
                "eur",
                details.name(),
                clerkId
        );

        // Snapshot the package terms so later verification uses the values agreed at checkout.
        OrderEntity order = OrderEntity.builder()
                .clerkId(clerkId)
                .plan(details.name())
                .credits(details.credits())
                .amount(details.amount())
                .sessionId(session.getId())
                .payment(false)
                .build();

        orderRepository.save(order);

        return session;
    }
}