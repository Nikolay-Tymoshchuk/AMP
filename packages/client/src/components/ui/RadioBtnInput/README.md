## Example

```
import { RadioBtnInput } from 'ui-kit/components/RadioBtnInput';
import { useForm } from 'react-hook-form';

const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm<FormInputsType>();

  <RadioBtnInput
    labelText="Легке"
    register={register('variant', { required: 'required' })}
    value="Легке"
    watchValue={watch('variant')}
    colorRadio="green"
    />
  <RadioBtnInput
    labelText="Середнє"
    register={register('variant', { required: 'required' })}
    value="Середнє"
    watchValue={watch('variant')}
    colorRadio="blue"
    />
  <RadioBtnInput
    labelText="Важке"
    register={register('variant', { required: 'required' })}
    value="Важке"
    watchValue={watch('variant')}
    colorRadio="red"
    />
```
