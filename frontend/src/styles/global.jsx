import { useTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';


const CustomGlobalStyles = () => {

  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        
        '.form-container': {
            width: '100%',
            maxWidth: '400px',
            padding: '2rem',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '12px',
            boxShadow: theme.shadows[3],
        },
        
        '::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '::-webkit-scrollbar-track': {
          background: theme.palette.background.default, 
        },
        '::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main, 
          borderRadius: '8px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.primary.dark, 
        },

        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        
        'input[type=number]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          margin: 0,
        },
        'input[type=number]': {
          '-moz-appearance': 'textfield',
        },
      }}
    />
  );
};

export default CustomGlobalStyles;