import {Flex} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {gs} from '../../GlobalStyles';

export const Star = ({number, theme}) => {
  return (
    <Flex direction="row" style={gs.mb20}>
      {Array.from({length: number}, (_, i) => (
        <EntypoIcon
          key={i}
          name="star"
          style={[gs.fs16, {color: theme}, gs.mr3]}
        />
      ))}
    </Flex>
  );
};
