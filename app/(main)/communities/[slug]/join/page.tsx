import Join from './_render';
import { getUser } from '@/lib/supabase-server';

const Component = async () => {
  const user = await getUser();
  return <Join user={user} />;
};

export default Component;
