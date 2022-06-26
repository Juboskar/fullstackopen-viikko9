import { Gender } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case 'male':
      return <MaleIcon />;
    case 'female':
      return <FemaleIcon />;
    default:
      return <></>;
  }
};

export default GenderIcon;
