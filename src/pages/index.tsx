import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/start');
  }, [router]);

  return null;
};

export default Redirect;
