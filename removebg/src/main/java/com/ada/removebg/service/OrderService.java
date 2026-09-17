package com.ada.removebg.service;


import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

public interface OrderService {
    Session createOrder(String planId, String clerkId) throws StripeException;
}
