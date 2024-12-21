import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cn from 'classnames';
import { ErrorType } from '../../types/ErrorType';

type Props = {
  error: ErrorType;
  setError: Dispatch<SetStateAction<ErrorType>>;
};

export const ErrorNotification: React.FC<Props> = props => {
  const { error, setError } = props;

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    if (error === ErrorType.Empty) {
      setIsHidden(true);

      return;
    }

    setIsHidden(false);

    const timerId = setTimeout(() => {
      setError(ErrorType.Empty);
      setIsHidden(true);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error, setError]);

  const handleClose = () => {
    setIsHidden(true);
    setError(ErrorType.Empty);
  };

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: isHidden },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={handleClose}
      />
      {error}
    </div>
  );
};
