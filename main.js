// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Pila Aequor object factory return the specimenNum and DNA array
const pAequorFactory = (num, array) => {
  return {
    specimenNum: num,
    dna: array,

    // Mutate method change a random base to a new random value
    mutate() {
      let baseIndex = Math.floor(Math.random() * 15);
      let diffBase = returnRandBase();
      let validChange = false;

      while(validChange) {
        this.dna[baseIndex] === diffBase ? diffBase = returnRandBase : validChange = true;
      }

      this.dna[baseIndex] = diffBase;

      return this.dna;
    },

    // Compare different pAequors with each other
    compareDNA(obj) {
      let identical = 0;

      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === obj.dna[i]) {
          identical++;
        }
      }
      return `Specimen #${this.specimenNum} and specimen #${obj.specimenNum} have ${(100 / this.dna.length * identical).toFixed()}% DNA in common`;
    },

    // Calculate the survival chance on terms of 'C' and 'G' Base
    willLikelySurvive() {
      let CGBase = 0;

      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') {
          CGBase++;
        }
      }
      
      let percentage = 100 / this.dna.length * CGBase;
      return percentage >= 60;
    }
  }
}

// Gather sample function on the samples which are likely to survive
const pAequorSamples = (num) => {
  let count = 1;
  const samples = [];

  while(count <= num) {;
    let pAequor = pAequorFactory(count, mockUpStrand());
    if(pAequor.willLikelySurvive) {
      samples.push(pAequor);
      count++;
    }
  }

  return samples;
}

const newSamples = pAequorSamples(30);

console.log(newSamples);

