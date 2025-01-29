import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Redirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/start'); // Redirige a la página /inicio
  }, [router]);

  return null;
};

export default Redirect;
