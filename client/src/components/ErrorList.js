import React from 'react';

const ErrorList = ({data}) => {
  return (
    <>
      {data && !data.errors && <p className='alert'>{data.message}</p>}
      {data && data.errors && data.errors.map(({msg, param}) => {
        return <p key={param} className='alert'>{msg}</p>
      })}
    </>
  );
};

export default ErrorList;