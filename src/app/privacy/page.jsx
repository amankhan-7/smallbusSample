import LegalDocument from '../components/LegalDocument';
import { privacyContent } from '@/data/legal/privacy';


const Privacy = () => {
  return <LegalDocument content={privacyContent} />;
};

export default Privacy;
