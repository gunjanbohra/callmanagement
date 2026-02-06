import { Button, Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import { counterState } from '@/store/counter';

export function Counter() {
  const [count, setCount] = useRecoilState(counterState);

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={() => setCount(count - 1)}>
        Decrease
      </Button>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Increase
      </Button>
    </Stack>
  );
}