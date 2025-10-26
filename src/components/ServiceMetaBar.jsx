import React from 'react';
import { CAT_LABEL} from '../utils/formatters';


export default function ServiceMetaBar({ duracionMin, categoria }) {
  const label = CAT_LABEL[categoria] || categoria;
  return (
    <div className="text-secondary small d-flex align-items-center gap-3">
      {duracionMin ? (
        <span><i className="bi bi-clock me-1" />{duracionMin} min</span>
      ) : null}
      {label ? (
        <span className="d-inline-flex align-items-center">
          <i className="bi bi-tag me-1" />
          {label}
        </span>
      ) : null}
    </div>
  );
}