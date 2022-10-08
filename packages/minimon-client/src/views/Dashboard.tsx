import React, { FC, useRef } from 'react';
import { Dial } from 'components/Dial';
import { makeStyles } from 'tss-react/mui';
import { Debug } from 'components/Debug';
import { useClickToReload, useSettingsSelector } from 'hooks';

interface ThemeProps {
  columns: number;
  rows: number;
  backgroundColor: string;
}

const useStyles = makeStyles<ThemeProps>()((theme, { columns, rows, backgroundColor }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: theme.spacing(1),
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor ? backgroundColor : theme.palette.background.default,
    boxSizing: 'border-box',
  },
  widgetWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const Dashboard: FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useClickToReload(rootRef);

  const { layout, themeOverrides } = useSettingsSelector((settings) => ({
    layout: settings.layout,
    themeOverrides: settings.theme,
  }));

  const { classes } = useStyles({
    columns: layout.columns,
    rows: layout.rows,
    backgroundColor: themeOverrides?.backgroundColor,
  });

  return (
    <div className={classes.root} ref={rootRef}>
      {layout.widgets.slice(0, layout.columns * layout.rows).map((widget, index) => (
        <div key={widget?.label ?? `null-${index}`} className={classes.widgetWrapper}>
          {widget && (
            <Dial key={widget.label} label={widget.label} vital={widget.vital} property={widget.property} />
          )}
        </div>
      ))}

      <Debug />
    </div>
  );
};
