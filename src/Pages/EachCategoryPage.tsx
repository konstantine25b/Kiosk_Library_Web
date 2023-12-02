import React from 'react'
import { useLocation } from 'react-router-dom';

export default function EachCategoryPage() {
    const { state } = useLocation();
    console.log(state);

  return (
    <div>EachCategoryPage</div>
  )
}
