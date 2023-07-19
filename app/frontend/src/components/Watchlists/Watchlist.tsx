import React, { useState, useEffect } from 'react';

import GenericList from '../CommonComponents/List';

interface IWatchlist {
    items: string[];
    label: string | number;
}

export default function Watchlist({ items, label }: IWatchlist) {
    return (
        <GenericList items={items} label={label}/>
    )
}