import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { ANIMATION_DURATION, ANIMATION_EASE } from '../../utils/constants';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
    },
  },
};

const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PageTransition;