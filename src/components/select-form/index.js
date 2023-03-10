// ** Imports
import React from 'react';
import { Controller } from 'react-hook-form';

// ** Mui
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Skeleton from '@mui/material/Skeleton';

function SelectForm({ name, label, items, loading, disabled, control, errorName }) {
  return (
    <>
      {!loading ? (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <>
                <Select label={label} defaultValue='' error={!!errorName} disabled={disabled} {...field}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {items.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
                {errorName && <FormHelperText sx={{ color: 'error.main' }}>{errorName.message}</FormHelperText>}
              </>
            )}
          />
        </FormControl>
      ) : (
        <Skeleton variant='rectangular' animation='wave' height={60} />
      )}
    </>
  );
}

export default SelectForm;
