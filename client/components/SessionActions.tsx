"use client";

import {
  PencilIcon,
  ShareIcon,
  TrashIcon,
  EllipsisVertical,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface SessionActionsProps {
  onRename?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

export function SessionActions({
  onRename,
  onShare,
  onDelete,
}: SessionActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <EllipsisVertical />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onRename}>
            <PencilIcon />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onShare}>
            <ShareIcon />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={onDelete}>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
