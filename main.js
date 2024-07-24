document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const itemsContainer = document.querySelector('.items');

    function transformItems() {
        const containerRect = itemsContainer.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;

        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenterX = itemRect.left + itemRect.width / 2;
            const distanceFromCenter = itemCenterX - containerCenterX;

            // Calculate scale: Larger at the edges, smaller at the center
            const maxScale = 0.5;  // Maximum scale for items at the edges
            const minScale = 1.5;  // Minimum scale for items at the center
            const scale = maxScale - (Math.abs(distanceFromCenter) / (containerRect.width / 2)) * (maxScale - minScale);

            // Calculate rotation: Rotate items based on their position relative to the center
            const maxRotation = -100;  // Maximum rotation in degrees
            const rotation = (distanceFromCenter / (containerRect.width / 2)) * maxRotation;

            // Apply transformation
            item.style.transform = `scale(${scale}) rotateY(${rotation}deg)`;
        });
    }

    itemsContainer.addEventListener('scroll', transformItems);
    window.addEventListener('resize', transformItems);

    // Initial transformation
    transformItems();
});