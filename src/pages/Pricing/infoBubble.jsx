import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  export default function infoBubble(header, body) {
    return (
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">{<i>{header}</i>}</Typography>
              <p style={{fontSize:13}}>{body}</p>
            </React.Fragment>
          }
        >
          <img src='https://upload.wikimedia.org/wikipedia/commons/4/43/Minimalist_info_Icon.png' height={15}/>
        </HtmlTooltip>
    );
  }