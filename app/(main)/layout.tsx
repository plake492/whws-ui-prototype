import Navigation from '@/components/homepage/Navigation';

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Navigation>{children}</Navigation>;
};

export default layout;
