import { useCallback, useState } from "react";

/**
 * Custom hook to manage menu anchor and modal state for reusable component flow.
 * Handles both menu and dialog (modal) interactions, while allowing flexible data handling.
 */
export function useMenuAnchor() {
    const [menuAnchor, setMenuAnchor] = useState({ element: null, data: null });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    /**
     * Open the menu with the given anchor element and any associated data object.
     * @param {Event} event - The triggering event (e.g., click).
     * @param {Object} data - The associated data for this menu action.
     */
    const handleMenuOpen = useCallback((event, data = {}) => {
        setMenuAnchor({ element: event.currentTarget, data });
    }, []);

    /**
     * Close the menu and reset the state.
     */
    const handleMenuClose = useCallback(() => {
        setMenuAnchor({ element: null, data: null });
    }, []);

    /**
     * Open the dialog with a specific data object, typically for edit actions.
     * @param {Object} data - The object to be edited or passed into the dialog.
     */
    const openDialog = useCallback((data = {}) => {
        setSelectedData(data);
        setIsDialogOpen(true);
        handleMenuClose(); // Ensure the menu is closed when the dialog opens.
    }, [handleMenuClose]);

    /**
     * Close the dialog and reset the selected data.
     */
    const closeDialog = useCallback(() => {
        setSelectedData(null);
        setIsDialogOpen(false);
    }, []);
    
    return {
        menuAnchor,
        handleMenuOpen,
        handleMenuClose,
        isDialogOpen,
        openDialog,
        closeDialog,
        selectedData,
        setSelectedData,
    };
}
