const handleUpdateExpansionsClick = (gameId) => {
    setLoading(true);
    getAllExpansionsForGameId(gameId)
      .then((res) => {
        if (res.status === 200) {
          const output = res.data.expansion.map((item) => {
            let { localization } = item;
            localization = localization.reduce(
              (acc, langItem) => ({
                ...acc,
                [langItem.languageName]: langItem.name
              }),
              {}
            );
            return {
              id: item.idExpansion,
              gameId: gameId,
              slug: '',
              numOfCards: 0,
              nameEn: localization.English ?? '',
              nameFr: localization.French ?? '',
              nameDe: localization.German ?? '',
              nameEs: localization.Spanish ?? '',
              nameIt: localization.Italian ?? '',
              abbreviation: item.abbreviation,
              icon: item.icon,
              dateRelease: item.releaseDate,
              isReleased: item.isReleased
            };
          });
          return createExpansions(output);
        }
        return false;
      })
      .then((res) => {
        if (res !== false) {
          toast.success('Les extensions ont été mises à jour');
          setLoading(false);
        } else {
          toast.error('Problème lors de la mise à jour des extensions');
          setLoading(false);
        }
      })
      .catch(() => {
        toast.error('Problème lors de la mise à jour des extensions');
        setLoading(false);
      });
  };