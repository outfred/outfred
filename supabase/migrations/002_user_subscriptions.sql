-- Migration: User Subscriptions System
-- Created: 2025-11-04
-- Description: Add subscription tracking to users table

-- Add subscription columns to users table (if not exists)
DO $$ 
BEGIN
    -- Add subscription_plan column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'subscription_plan'
    ) THEN
        ALTER TABLE users ADD COLUMN subscription_plan VARCHAR(50) DEFAULT 'free';
    END IF;

    -- Add searches_count column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'searches_count'
    ) THEN
        ALTER TABLE users ADD COLUMN searches_count INTEGER DEFAULT 0;
    END IF;

    -- Add subscription_expires_at column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'subscription_expires_at'
    ) THEN
        ALTER TABLE users ADD COLUMN subscription_expires_at TIMESTAMP NULL;
    END IF;

    -- Add payment_status column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'payment_status'
    ) THEN
        ALTER TABLE users ADD COLUMN payment_status VARCHAR(20) DEFAULT 'none';
    END IF;

    -- Add last_search_reset column
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'users' AND column_name = 'last_search_reset'
    ) THEN
        ALTER TABLE users ADD COLUMN last_search_reset TIMESTAMP DEFAULT NOW();
    END IF;
END $$;

-- Create index for subscription lookups
CREATE INDEX IF NOT EXISTS idx_users_subscription ON users(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_users_payment_status ON users(payment_status);

-- Create payments table for transaction history
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  plan_id UUID REFERENCES subscription_plans(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'SAR',
  payment_method VARCHAR(50) DEFAULT 'paymob',
  transaction_id VARCHAR(255),
  paymob_order_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction ON payments(transaction_id);

-- Update existing users to have free plan
UPDATE users SET subscription_plan = 'free' WHERE subscription_plan IS NULL;
UPDATE users SET searches_count = 0 WHERE searches_count IS NULL;
UPDATE users SET payment_status = 'none' WHERE payment_status IS NULL;
UPDATE users SET last_search_reset = NOW() WHERE last_search_reset IS NULL;

COMMENT ON COLUMN users.subscription_plan IS 'User subscription plan: free, basic, pro';
COMMENT ON COLUMN users.searches_count IS 'Number of searches used in current period';
COMMENT ON COLUMN users.subscription_expires_at IS 'Expiration date of paid subscription';
COMMENT ON COLUMN users.payment_status IS 'Payment status: none, active, expired, cancelled';
COMMENT ON COLUMN users.last_search_reset IS 'Last time search count was reset (monthly)';
