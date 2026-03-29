// ─── Overlay System — Liquid Glass SaaS ──────────────────────────────────────
// Portal-rendered floating UI components with focus trap, scroll lock, and
// consistent Liquid Glass visual treatment.

export { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmationModal } from "./Modal";
export type { ModalProps, ModalVariant, ModalSize, ModalAction, ConfirmationModalProps, ConfirmVariant } from "./Modal";

export { Drawer } from "./Drawer";
export type { DrawerProps, DrawerPosition, DrawerSize } from "./Drawer";

export { Dropdown } from "./Dropdown";
export type { DropdownProps, DropdownItem, DropdownPlacement } from "./Dropdown";

export { Popover } from "./Popover";
export type { PopoverProps, PopoverPlacement, PopoverTrigger } from "./Popover";

export { Tooltip } from "./Tooltip";
export type { TooltipProps, TooltipPlacement, TooltipSize } from "./Tooltip";

export { ContextMenu } from "./ContextMenu";
export type { ContextMenuProps, ContextMenuItem } from "./ContextMenu";

export { useFocusTrap }  from "./hooks/useFocusTrap";
export { useScrollLock } from "./hooks/useScrollLock";
export { useOnClickOutside } from "./hooks/useOnClickOutside";
