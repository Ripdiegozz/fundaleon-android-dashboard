"use client";

import { useEffect, useState } from "react";
import { SearchBookModal } from "../modals/search-book-modal";
import { SearchAndEditBookModal } from "../modals/search-edit-book-modal";
import { SearchDeleteBookModal } from "../modals/search-delete-book-modal";
import { SearchCustomerModal } from "../modals/search-customer-modal";
import { SearchEditCustomerModal } from "../modals/search-edit-customer-modal";
import { SearchDeleteCustomerModal } from "../modals/search-delete-customer-modal";

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
            <SearchCustomerModal />
            <SearchEditCustomerModal />
            <SearchDeleteCustomerModal />
        </>
    )
}