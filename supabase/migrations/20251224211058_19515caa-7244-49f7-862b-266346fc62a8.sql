-- Allow the has_role function to be called by authenticated users
-- The function already has SECURITY DEFINER so it bypasses RLS
-- But let's ensure authenticated users can call it

-- Grant execute permission on has_role function to authenticated users
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon;