import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import './InputTextField.scss';
import '../Home/Home.scss';

export default function InputTextField(props: any) {
  const { itemId } = props;

  return (
    <Stack
      component="form"
      sx={{
        width: '25ch'
      }}
      spacing={2}
      noValidate
      autoComplete="off"
    >
      <TextField id={itemId} className="blank_basic" variant="outlined" />
    </Stack>
  );
}
