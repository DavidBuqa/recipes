import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import debounce from 'debounce';
import { autocompleteApi } from '../../Utils/api';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  }
}));

const AsynchronousAutocomplete = () => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const onInputChange = (event, value) => {
    (async () => {
      const response = await axios.get(autocompleteApi(value));
      const recipes = await response.data;

      setOptions(recipes);
    })();
  };

  const onValueChange = (event, value) => {
    if (value) {
      history.push(`/recipe/${value.id}`);
      window.location.href = window.location.href;
    }
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const classes = useStyles();

  return (
    <Autocomplete
      id="asynchronous-search"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={onValueChange}
      onInputChange={debounce(onInputChange, 300)}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            classes: {
              root: classes.inputRoot
            },
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AsynchronousAutocomplete;