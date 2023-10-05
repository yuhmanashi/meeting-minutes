import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function GenericMenu({options, buttonColor = null}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
  }

  return (
    <div>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {buttonColor ? 
          <MoreHorizIcon sx={{color: buttonColor}}/>
            :
          <MoreHorizIcon />
        }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        disableScrollLock={true}
      >
        {options.map((option, index) => {
          const unique = generateKey(index);
            return (
                <MenuItem key={unique} onKeyDown={(e) => e.stopPropagation()}>
                    {option}
                </MenuItem>
            )
        })}
      </Menu>
    </div>
  );
}