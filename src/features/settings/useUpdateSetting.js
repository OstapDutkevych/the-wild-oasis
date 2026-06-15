import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '@services/apiSettings.js';
import toast from 'react-hot-toast';

export function useUpdateSetting() {
  const queryCLient = useQueryClient();

  const { mutate: updateSetting, isPending: isUpdating } =
    useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success('Settings successfully updated');
        queryCLient.invalidateQueries({ queryKey: ['settings'] });
      },
      onError: (err) => toast.error(err.message),
    });

  return { updateSetting, isUpdating };
}
