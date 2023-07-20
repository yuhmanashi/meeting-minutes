import React, { useState, useEffect } from 'react';

import GenericList from '../CommonComponents/List';

interface IWatchlist {
    items: string[];
}

export default function Watchlist({ items }: IWatchlist) {
    return (
        <GenericList items={items} />
    )
}