import { Dna } from 'react-loader-spinner';
import { Background } from './Loader.styled';

export const Loader = () => {
  return (
    <Background>
      <Dna
        visible={true}
        height="180"
        width="180"
        ariaLabel="dna-loading"
        wrapperStyle={{
          position: 'absolute',
          left: '50%',
          top: '25%',
          transform: 'translate(-50%)',
        }}
        wrapperClass="dna-wrapper"
      />
    </Background>
  );
};


