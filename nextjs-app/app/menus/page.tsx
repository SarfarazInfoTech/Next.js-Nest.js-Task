"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Grid,
  ChevronDown,
  ChevronRight,
  Plus,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { addMenu, deleteMenu, fetchMenus, updateMenu } from "@/store/menuSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function MenusPage() {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.menu.menus);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    depth: "",
    label: "",
    parentId: "",
  });

  const [expanded, setExpanded] = useState(true);

  const handleExpandAll = () => setExpanded(true);
  const handleCollapseAll = () => setExpanded(false);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const handleChange = (newFormData: object) => {
    console.log(newFormData);
    setFormData(newFormData);
  };

  const handleSubmit = () => {
    if (formData.name === "") {
      alert("Please enter menu name");
    } else if (formData.id === "") {
      dispatch(addMenu({ name: formData.name })).then((res) => {
        if (res.type === "menu/addMenu/fulfilled") {
          dispatch(fetchMenus());
        }
      });
    } else {
      dispatch(addMenu({ name: formData.name, parentId: formData.id })).then(
        (res) => {
          if (res.type === "menu/addMenu/fulfilled") {
            dispatch(fetchMenus());
          }
        }
      );
    }
  };

  const handleDelete = () => {
    dispatch(deleteMenu(formData.id)).then((res) => {
      if (res.type === "menu/deleteMenu/fulfilled") {
        dispatch(fetchMenus());
      }
    });
  };

  const handleUpdate = () => {
    dispatch(updateMenu({ ...formData, name: formData.name })).then((res) => {
      if (res.type === "menu/updateMenu/fulfilled") {
        dispatch(fetchMenus());
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-full bg-blue-700 p-3">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold">Menus</h1>
        </div>

        <div className="mb-4">
          <span className="text-gray-400">Menu</span>
          <Select defaultValue="system management">
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Menu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system management">
                system management
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant={expanded ? "default" : "outline"}
            className="rounded-full px-7"
            onClick={handleExpandAll}
          >
            Expand All
          </Button>
          <Button
            variant={!expanded ? "default" : "outline"}
            className="rounded-full px-7"
            onClick={handleCollapseAll}
          >
            Collapse All
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr,500px] gap-6">
        <div className="">
          <TreeView
            data={data}
            formData={formData}
            handleChange={handleChange}
            expanded={expanded}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Menu ID</label>
            <div className="p-3 bg-gray-50 rounded-lg">{formData?.id}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Depth</label>
            <div className="p-3 bg-gray-50 rounded-lg">{formData?.depth}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Parent Data</label>
            <div className="p-3 bg-gray-50 rounded-lg">{formData?.label}</div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Name</label>
            <Input
              name={formData?.name}
              value={formData?.name}
              maxLength={30}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <Button
            className="w-full rounded-full bg-blue-700"
            onClick={handleSubmit}
          >
            Save
          </Button>
          {formData.id && (
            <div className="flex justify-center gap-5">
              <Button
                className="w-full rounded-full bg-red-700"
                onClick={handleDelete}
              >
                Delete {formData.label} Menu
              </Button>
              <Button
                className="w-full rounded-full bg-yellow-700"
                onClick={handleUpdate}
              >
                Update {formData.label} Menu
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TreeView({
  expanded,
  data,
  formData,
  handleChange,
  parentId,
}: {
  expanded: boolean;
  data: any;
  formData: { [key: string]: any };
  handleChange: (newFormData: object) => void;
  parentId?: string;
}) {
  return (
    <div className="text-sm">
      {data?.map(
        ({
          id,
          name,
          depth,
          children,
        }: {
          id: string;
          name: string;
          depth: number;
          children: any;
        }) => (
          <TreeItem
            id={id}
            name={name}
            depth={depth}
            key={id}
            label={name}
            children={children}
            expanded={expanded}
            handleChange={handleChange}
            parentId={parentId}
          />
        )
      )}
    </div>
  );
}

function TreeItem({
  id,
  name,
  depth,
  label,
  children,
  expanded: parentExpanded = false,
  handleChange,
  parentId,
}: {
  id: string;
  name: string;
  depth: number;
  label: string;
  children?: any;
  expanded?: boolean;
  handleChange: (newFormData: object) => void;
  parentId?: string;
}) {
  const [expanded, setExpanded] = useState(parentExpanded);

  useEffect(() => {
    setExpanded(parentExpanded);
  }, [parentExpanded]);

  const hasChildren = Boolean(children);

  return (
    <div>
      <div
        className="flex items-center gap-1 py-1 hover:bg-gray-50 rounded px-1 cursor-pointer"
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          handleChange({ id, name: "", depth, label, parentId: parentId });
        }}
      >
        {children?.length > 0 && hasChildren ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )
        ) : (
          <div className="w-4" />
        )}
        <span>{label}</span>
        {label === "System Code" && (
          <div className="bg-blue-700 ml-1 rounded-full p-1">
            <Plus className="h-4 w-4 text-white" />
          </div>
        )}
      </div>
      {expanded && hasChildren && (
        <div className="ml-4 border-l pl-2">
          {children?.map(
            ({
              id,
              name,
              depth,
              children,
              parentId,
            }: {
              id: string;
              name: string;
              depth: number;
              children: any;
              parentId: string;
            }) => (
              <TreeItem
                id={id}
                name={name}
                depth={depth}
                key={id}
                label={name}
                children={children}
                expanded={expanded}
                handleChange={handleChange}
                parentId={parentId}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

{
  /* <TreeItem label="system management" expanded={expanded}>
        <TreeItem label="System Management" expanded={expanded}>
          <TreeItem label="Systems" expanded={expanded}>
            <TreeItem label="System Code" expanded={expanded}>
              <TreeItem label="Code Registration" />
            </TreeItem>
            <TreeItem label="Code Registration - 2" />
            <TreeItem label="Properties" />
            <TreeItem label="Menus" expanded={expanded}>
              <TreeItem label="Menu Registration" />
            </TreeItem>
            <TreeItem label="API List" expanded={expanded}>
              <TreeItem label="API Registration" />
              <TreeItem label="API Edit" />
            </TreeItem>
          </TreeItem>
          <TreeItem label="Users & Groups" expanded={expanded}>
            <TreeItem label="Users" expanded={expanded}>
              <TreeItem label="User Account Registration" />
            </TreeItem>
            <TreeItem label="Groups" expanded={expanded}>
              <TreeItem label="User Group Registration" />
            </TreeItem>
            <TreeItem label="사용자 승인" expanded={expanded}>
              <TreeItem label="사용자 승인 상세" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeItem> */
}
