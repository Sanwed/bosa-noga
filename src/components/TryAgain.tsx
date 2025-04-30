import { Button } from 'react-bootstrap';
import { MouseEvent } from 'react';
import { TryAgainTypes } from '../types/enums.ts';

interface Props {
  children?: string;
  type?: TryAgainTypes;
  buttonText?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function TryAgain({
  children,
  onClick,
  buttonText = 'Попробовать еще раз',
  type = TryAgainTypes.DEFAULT,
}: Props) {
  return (
    <>
      {type === TryAgainTypes.DEFAULT && (
        <p className="text-center my-2">
          {children ? children : 'Что-то пошло не так, попробуйте еще раз'}
        </p>
      )}
      <Button onClick={onClick} style={{ margin: '0 auto', display: 'block' }} variant="danger">
        {buttonText}
      </Button>
    </>
  );
}

export { TryAgain };
