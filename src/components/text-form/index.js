import Translations from 'src/layouts/components/Translations';
import { useController, Controller } from 'react-hook-form';

// ** MUI Components
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';

function TextForm({ name, control, label, textTranslations, placeholder, icon, id, errorName, loading, ...props }) {
  return (
    <>
      {!loading ? (
        <FormControl fullWidth>
          <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errorName)}>
            <Translations text={textTranslations} />
          </InputLabel>
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <OutlinedInput
                label={label}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={placeholder}
                error={Boolean(errorName)}
                startAdornment={<InputAdornment position='start'>{icon}</InputAdornment>}
                {...props}
              />
            )}
          />
          {errorName && (
            <FormHelperText sx={{ color: 'error.main' }}>
              <Translations text={errorName.message} />
            </FormHelperText>
          )}
        </FormControl>
      ) : (
        <Skeleton variant='rectangular' animation='wave' height={60} />
      )}
    </>
  );
}

export default TextForm;
