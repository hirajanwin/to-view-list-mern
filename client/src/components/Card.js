import React, { useState } from 'react';

import {
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  Link,
  Chip,
  Button,
  IconButton,
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import LinkIcon from '@material-ui/icons/Link';
import WebIcon from '@material-ui/icons/Web';
import YouTubeIcon from '@material-ui/icons/YouTube';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    padding: 20,
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  },
  endButtons: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  linkTitle: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  tag: {
    marginRight: 5,
  },
  tagsGroup: {
    marginTop: 8,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  delete: {
    color: '#ff6347',
    '&:hover': {
      backgroundColor: '#ffe8e4',
    },
    marginRight: 5,
  },
  edit: {
    color: '#536dfe',
    '&:hover': {
      backgroundColor: '#eff1ff',
    },
    marginRight: 5,
  },
}));

const Card = ({ entries }) => {
  const { title, link, description, tags, type, viewed, starred } = entries;

  const [isStarred, setIsStarred] = useState(starred === 'true');
  const [isViewed, setIsViewed] = useState(viewed === 'true');

  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleStarred = (e) => {
    setIsStarred(e.target.checked);
  };

  const handleViewed = (e) => {
    setIsViewed(e.target.checked);
  };

  const handleTagFilter = (tag) => {
    console.log('filtered by tag', tag);
  };

  const handleEdit = () => {
    console.log('edited');
  };

  const handleDelete = () => {
    console.log('deleted');
  };

  const formattedLink = link.startsWith('http') ? link : `https://${link}`;

  return (
    <Paper className={classes.root} elevation={2}>
      <div className={classes.cardTitle}>
        <Typography variant="h5" className={classes.linkTitle}>
          {type === 'article' ? (
            <WebIcon style={{ marginRight: 8 }} />
          ) : type === 'video' ? (
            <YouTubeIcon style={{ marginRight: 8 }} />
          ) : null}
          {title}
        </Typography>

        <div className={classes.endButtons}>
          {!isMobile ? (
            <>
              <Button
                onClick={handleEdit}
                startIcon={<EditIcon />}
                className={classes.edit}
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
                className={classes.delete}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={handleEdit} className={classes.edit}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} className={classes.delete}>
                <DeleteIcon />
              </IconButton>
            </>
          )}

          <FormControlLabel
            control={
              <Checkbox
                icon={<StarBorderIcon />}
                checkedIcon={<StarIcon />}
                name="star"
              />
            }
            label={isMobile ? '' : isStarred ? 'Starred!' : 'Star it'}
            onChange={handleStarred}
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<VisibilityOutlinedIcon />}
                checkedIcon={<VisibilityIcon />}
              />
            }
            label={isMobile ? '' : isViewed ? 'Viewed!' : 'Mark as viewed'}
            onChange={handleViewed}
          />
        </div>
      </div>
      <div>
        <Link
          href={formattedLink}
          target="_blank"
          rel="noreferrer"
          variant="h6"
          className={classes.link}
        >
          <LinkIcon style={{ marginRight: 8 }} />
          {formattedLink.length > 40
            ? formattedLink.slice(0, 40) + '...'
            : formattedLink}
        </Link>
        <Typography varaint="body1">{description}</Typography>
        <div className={classes.tagsGroup}>
          Tags:{' '}
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              color="secondary"
              className={classes.tag}
              onClick={() => handleTagFilter(tag)}
            />
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default Card;