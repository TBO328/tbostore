-- Drop the insecure public read policy for coupons
DROP POLICY IF EXISTS "Anyone can view active coupons" ON public.coupons;

-- Create a secure RPC function to validate a single coupon code
-- This prevents enumeration attacks while still allowing coupon validation
CREATE OR REPLACE FUNCTION public.validate_coupon(coupon_code text)
RETURNS TABLE(
  is_valid boolean,
  discount_percent integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    true as is_valid,
    c.discount_percent
  FROM public.coupons c
  WHERE c.code = coupon_code
    AND c.is_active = true
    AND (c.expires_at IS NULL OR c.expires_at > now());
  
  -- If no rows returned, return invalid result
  IF NOT FOUND THEN
    RETURN QUERY SELECT false as is_valid, 0 as discount_percent;
  END IF;
END;
$$;