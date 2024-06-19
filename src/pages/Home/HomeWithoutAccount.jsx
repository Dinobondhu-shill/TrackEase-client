import Banner from './Banner';
import About from './About';
import NewsLetter from '../../components/NewsLetter';
import Packages from './Packages';

const HomeWithoutAccount = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Packages></Packages>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default HomeWithoutAccount;