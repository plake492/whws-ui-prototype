import Navigation from '@/components/Navigation';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Navigation>{children}</Navigation>;
};

export default layout;
