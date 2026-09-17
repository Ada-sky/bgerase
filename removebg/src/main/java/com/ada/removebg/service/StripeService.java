package com.ada.removebg.service;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

import java.util.Map;

public interface StripeService {
    Session createCheckoutSession(Double amount, String currency, String plan, String clerkId) throws StripeException;

    Map<String, Object> verifyPayment(String sessionId) throws StripeException;
}