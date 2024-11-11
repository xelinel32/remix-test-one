import {LinkProps} from '@remix-run/react';
import {forwardRef} from 'react';

import {Button, ButtonProps} from '@mui/material';

import {I18nLink} from './i18n-link';

export type AppButtonProps = LinkProps & ButtonProps;

export const AppButton = forwardRef<HTMLAnchorElement | HTMLButtonElement, AppButtonProps>(
  ({children, ...props}, ref) => {
    return (
      <Button
        component="button"
        LinkComponent={linkProps => (
          <I18nLink {...linkProps} ref={ref as React.Ref<HTMLAnchorElement>} />
        )}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

AppButton.displayName = 'AppButton';
