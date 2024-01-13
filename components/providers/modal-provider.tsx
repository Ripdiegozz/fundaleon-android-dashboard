"use client";

import { useEffect, useState } from "react";
import { SearchBookModal } from "../modals/search-book-modal";
import { SearchAndEditBookModal } from "../modals/search-edit-book-modal";
import { SearchDeleteBookModal } from "../modals/search-delete-book-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <SearchBookModal />
            <SearchAndEditBookModal />
            <SearchDeleteBookModal />
        </>
    )
}