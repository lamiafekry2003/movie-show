export const fedIn = (direction = 'up', delay = 0) => {
    return {
      hidden: {
        opacity: 0,
        x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      },
      show: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            type:'tween',
          duration: .5,
          delay,
        //   ease: 'easeInOut',
        ease:[.25,.25,.25,.75]
        },
      },
    };
  };