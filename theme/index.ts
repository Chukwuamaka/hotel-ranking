import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import buttonTheme from './components/button';
import inputTheme from './components/input';
import selectTheme from './components/select';
import textareaTheme from './components/textarea';

const overrides = {
  colors,
  components: {
    Button: buttonTheme,
    Input: inputTheme,
    Select: selectTheme,
    Textarea: textareaTheme,
  }
}

const theme = extendTheme(overrides);

export default theme;