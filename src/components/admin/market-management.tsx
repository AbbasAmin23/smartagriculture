'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PlusCircle, Edit, Trash2, Leaf } from 'lucide-react';
import {
  useCollection,
  useFirestore,
  useMemoFirebase,
  addDocumentNonBlocking,
  deleteDocumentNonBlocking,
  updateDocumentNonBlocking,
} from '@/firebase';
import { collection, query, doc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '@/context/language-context';

type MarketItem = {
  id: string;
  vegetableName: string;
  pricePerKg: number;
  date: any;
};

export function AdminMarketManagement() {
  const firestore = useFirestore();
  const { translations } = useLanguage();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentItem, setCurrentItem] = useState<MarketItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');


  const marketDataQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'marketData'));
  }, [firestore]);

  const { data: marketPrices, isLoading } = useCollection<MarketItem>(marketDataQuery);

  const handleEditClick = (item: MarketItem) => {
    setCurrentItem(item);
    setNewItemName(item.vegetableName);
    setNewItemPrice(item.pricePerKg.toString());
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!firestore || !currentItem || !newItemName.trim() || !newItemPrice.trim()) return;
    const itemDoc = doc(firestore, 'marketData', currentItem.id);
    updateDocumentNonBlocking(itemDoc, {
      vegetableName: newItemName,
      pricePerKg: parseFloat(newItemPrice),
      date: serverTimestamp(), // Update the date on edit
    });
    setIsEditDialogOpen(false);
    setCurrentItem(null);
    setNewItemName('');
    setNewItemPrice('');
  };

  const handleAdd = () => {
    if (!firestore || !newItemName.trim() || !newItemPrice.trim()) return;
    const marketCollection = collection(firestore, 'marketData');
    addDocumentNonBlocking(marketCollection, {
      vegetableName: newItemName,
      pricePerKg: parseFloat(newItemPrice),
      date: serverTimestamp(),
      // In a real app, you would associate this with the admin user
      adminId: 'admin_placeholder_id'
    });
    setIsAddDialogOpen(false);
    setNewItemName('');
    setNewItemPrice('');
  };

  const confirmDelete = (id: string) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (!firestore || !itemToDelete) return;
    const itemDoc = doc(firestore, 'marketData', itemToDelete);
    deleteDocumentNonBlocking(itemDoc);
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Market Data Management</CardTitle>
            <CardDescription>
              Add, edit, or delete market prices for produce.
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" /> Add New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Produce</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="add-name">Produce Name</Label>
                  <Input id="add-name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="e.g., Tomato" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-price">Price per Kg (INR)</Label>
                  <Input id="add-price" type="number" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} placeholder="e.g., 30.50" />
                </div>
              </div>
              <DialogFooter>
                 <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                 </DialogClose>
                <Button onClick={handleAdd}>Add Produce</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produce</TableHead>
              <TableHead className="text-right">Price (per kg)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={3}>Loading...</TableCell></TableRow>}
            {marketPrices?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-primary" />
                    <span className="font-medium">{item.vegetableName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">₹{item.pricePerKg.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => confirmDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Produce Price</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Produce Name</Label>
                <Input id="edit-name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price per Kg (INR)</Label>
                <Input id="edit-price" type="number" value={newItemPrice} onChange={(e) => setNewItemPrice(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleUpdate}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation */}
        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the market data for this item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      </CardContent>
    </Card>
  );
}
