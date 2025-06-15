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
        
        // Exemplo: Estilizando a barra de rolagem usando cores do tema
        '::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '::-webkit-scrollbar-track': {
          background: theme.palette.background.default, // Cor de fundo do tema
        },
        '::-webkit-scrollbar-thumb': {
          background: theme.palette.primary.main, // Cor primária do tema
          borderRadius: '8px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: theme.palette.primary.dark, // Cor primária mais escura no hover
        },

        // Exemplo: Reset básico para links
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        
        // Exemplo: Removendo setas de inputs do tipo 'number'
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