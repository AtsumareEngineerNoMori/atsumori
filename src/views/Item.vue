<script>
const getIsland = async () => {
  const response = await fetch(
    `http://localhost:8000/joinIslands/?userId=${3}`
  );
  const data = await response.json();
  joinList.value = data;
  console.log(joinList.value);

  const getIslandData = async (islandId) => {
    const response = await fetch(
      `http://localhost:8000/Islands/?id=${islandId}`
    );
    const data = await response.json();
    return data;
  };

  const islandDataPromises = joinList.value.map((item) =>
    getIslandData(item.islandId)
  );
  islandData.value = await Promise.all(islandDataPromises);
  console.log(islandData.value);
};
</script>
