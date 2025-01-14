import { useState, useCallback } from 'react';

export const useAssets = (initialAssets = []) => {
  const [assets, setAssets] = useState(initialAssets);

  const addAsset = useCallback((newAsset) => {
    setAssets(prev => [...prev, { ...newAsset, id: Date.now() }]);
  }, []);

  const updateAsset = useCallback((updatedAsset) => {
    setAssets(prev => prev.map(asset => 
      asset.id === updatedAsset.id ? updatedAsset : asset
    ));
  }, []);

  const deleteAsset = useCallback((assetId) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId));
  }, []);

  return {
    assets,
    addAsset,
    updateAsset,
    deleteAsset
  };
};