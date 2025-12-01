import GradientWrapper from '@/components/GradientWrapper';
import FormWrapper from '@/components/FormWrapper';

const Component = ({ children }: { children: React.ReactNode }) => {
  return (
    <GradientWrapper>
      <FormWrapper withLogo>{children}</FormWrapper>
    </GradientWrapper>
  );
};

export default Component;
