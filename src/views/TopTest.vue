<script setup>
const getFlight = async() => {
const response = await fetch(
        `http://localhost:8000/items`
      );
      const data = await response.json();
      console.log(data)
}
getFlight();

</script>
